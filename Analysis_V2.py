from PIL import Image
import numpy as np
from IPython import display

import pyaes
import pbkdf2
import os
import secrets

import ast
import time

import cv2

arr=list()

for i in range(0,10):
    start=time.time()
    
    path="res/SWDevtProcess.jpg"

    name,extension=os.path.splitext(path)

    if(extension==".png"):
        img_png=cv2.imread(path)
        cv2.imwrite(name+".jpg", img_png, [int(cv2.IMWRITE_JPEG_QUALITY), 100])

    img=Image.open(name+".jpg")

    np_image=np.array(img) # PIXELS ARE STORED IN A NP-ARRAY
    np_image=list(np_image)

    password="aespython"
    passwordSalt=os.urandom(16)
    key=pbkdf2.PBKDF2(password, passwordSalt).read(32) #KEY - PRE-SHARED WITH THE RECEIVER
    iv=secrets.randbits(256) #INITIALIZATION VECTOR - PRE-SHARED WITH THE RECEIVER

    aes=pyaes.AESModeOfOperationCTR(key,pyaes.Counter(iv))
    encrypted=aes.encrypt(str(np_image))

    aes=pyaes.AESModeOfOperationCTR(key,pyaes.Counter(iv))
    decrypted=aes.decrypt(encrypted)
    decrypted=str(decrypted)

    decrypted=decrypted.replace("b","")
    decrypted=decrypted.replace("'","")
    decrypted=decrypted.replace("(","")
    decrypted=decrypted.replace(")","")
    decrypted=decrypted.replace(" ","")
    decrypted=decrypted.replace("\\n","")
    decrypted=decrypted.replace("array","")
    decrypted=decrypted.replace(",dtype=uint8","")

    decrypted_final=np_image.copy()

    conv_list=ast.literal_eval(decrypted)

    for i in range(0,len(conv_list)):
        for j in range(0,len(conv_list[i])):
            if(conv_list[i][j] is Ellipsis):
                continue
            for k in range(0,len(conv_list[i][j])):
                decrypted_final[i][j][k]=int(conv_list[i][j][k])

    decrypted_final=np.array(decrypted_final)

    decrypted_img=Image.fromarray(decrypted_final)

    decrypted_img.save("decrypted.jpg")

    end=time.time()

    arr.append(end-start)

    print(arr[-1])

print(f'\nAVG. = {sum(arr)/len(arr)}')
