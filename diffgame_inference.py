import numpy as np
import pandas as pd
import os
from natsort import natsorted 
from PIL import Image
import PySimpleGUI as sg
import cv2
import argparse


parser = argparse.ArgumentParser(description='''
set difficulty
 ''')
parser.add_argument('--Diff','--d', default=200, help='diffculty from 4 to 1000,default 200')
args = parser.parse_args()

def get_question(MAXNUM,names,imagenames,simmatrix):
    num=np.random.randint(MAXNUM-1)
    answer=names[num]
    image=cv2.imread('1000movies/'+imagenames[num])
    topk=np.argpartition(simmatrix[num], -4)[-4:]
    proposals=list(names[topk])
    if answer not in proposals:
        proposals[np.random.randint(4)]=answer
    return image, proposals, answer

def changeimage(window,key,img):
    imgbytes = cv2.imencode(".png", cv2.resize(img,(512,512)))[1].tobytes()
    window[key].update(data=imgbytes)
def setbuttons(window,proposals):
    for i ,prop in enumerate(proposals):
        window[str(i+1)].update(prop)

def mainloop(MAXNUM):
    MAXNUM=200
    movies=pd.read_csv('imdb (1000 movies) in june 2022.csv')[:MAXNUM]
    names=movies['movie name\r\n']
    imagenames=natsorted(os.listdir('1000movies/'))[:MAXNUM]
    simmatrix=np.load('moivieSimilarity.npy')[:MAXNUM,:MAXNUM]

    sg.theme('DarkAmber')
    layout = [[sg.Image(filename="", key="-IMAGE-")],
              [sg.Button('1',key='1'), 
       sg.Button('2',key='2')], 
       [sg.Button('3',key='3'),  
       sg.Button('4',key='4')],
       [sg.Text('Answer',key='Answer')],]
    window = sg.Window('Quiz', layout)


    event, values = window.read()
    image,proposals,answer=get_question(MAXNUM,names,imagenames,simmatrix)
    changeimage(window,'-IMAGE-',image)
    setbuttons(window,proposals)
    while True:
        event, values = window.read()
        if event == sg.WIN_CLOSED or event == 'Cancel': 
            break
        if event in ['1','2','3','4']:
            window['Answer'].update(answer)
            if answer==proposals[int(event)-1]:
                window['Answer'].update(background_color='green')
            else:
                window['Answer'].update(background_color='red')
            image,proposals,answer=get_question(MAXNUM,names,imagenames,simmatrix)
            changeimage(window,'-IMAGE-',image)
            setbuttons(window,proposals)

if __name__ == "__main__":
   mainloop(args.Diff)

