from os import path, mkdir
from PIL import Image

import pandas as pd
import numpy as np
import requests
import json

# output_folder = "generated"
# if not path.exists(output_folder):
#     mkdir(output_folder)

# def generate_image(background, character, object, file_name):
#   background_file = path.join("backgrounds", f"{background}.png")
#   background_image = Image.open(background_file)

#   #Create character
#   character_file = path.join("characters", f"{character}.png")
#   character_image = Image.open(character_file)
#   coordinates = (int(1920/2-character_image.width/2), int(1000-character_image.height)) #x, y
#   background_image.paste(character_image, coordinates, mask=character_image)

#   #Create object
#   if object != "none":
#     object_file = path.join("objects", f"{object}.png")
#     object_image = Image.open(object_file)
#     coordinates = (int(1920/2+character_image.width/2+30), int(1000-object_image.height)) #x, y
#     background_image.paste(object_image, coordinates, mask=object_image)
#     output_file = path.join(output_folder, f"{file_name}.png")
#     background_image.save(output_file)

# for background in ["background1", "background2", "background3"]:
#     for character in ["elf1", "elf2", "elf3"]:
#         for object in ["object1", "object2", "object3"]:
#             generate_image(background, character, object, file_name=f"{background}{character}{object}")




output_folder = "generated"
if not path.exists(output_folder):
    mkdir(output_folder)

backgrounds = ["countryside", "desert", "forest", "glacial"]
characters = ["mage", "warrior", "pirate", "monster", "toadking"]
objects = ["none", "barrel", "anchor", "axe", "bomb", "key", "chest", "bananas", "cupcake", "donut", "heart",]

def generate_image(background, character, object, file_name):
    """Generate image with given background, given character and given object and save it with the given file name
    Args:
        background (str): background name
        character (str): character name
        object (str): object name
        file_name (str): file name
    """
    background_file = path.join("backgrounds", f"{background}.png")
    background_image = Image.open(background_file)

    #Create character
    character_file = path.join("characters", f"{character}.png")
    character_image = Image.open(character_file)

    coordinates = (int(1920/2-character_image.width/2), int(1000-character_image.height)) #x, y
    background_image.paste(character_image, coordinates, mask=character_image)

    #Create object
    if object != "none":
        object_file = path.join("objects", f"{object}.png")
        object_image = Image.open(object_file)

        coordinates = (int(1920/2+character_image.width/2+30), int(1000-object_image.height)) #x, y
        background_image.paste(object_image, coordinates, mask=object_image)

    output_file = path.join(output_folder, f"{file_name}.png")
    background_image.save(output_file)

def generate_all_imgs():
    """Generate all possible combination of images
    """
    num = 0
    df = pd.DataFrame(columns = ["background", "character", "object", "generated image"])
    for background in backgrounds:
        for character in characters:
            for object in objects:
                generate_image(background, character, object, f"generated{num}")
                data = [background, character, object, f"generated{num}"]
                s = pd.Series(data, index=df.columns)
                df = df.append(s, ignore_index=True)
                num += 1
    df.to_csv('data.csv', index=False)

def generate_random_imgs(total_imgs):
    """Generates a given number of random images according to predefined probabilities
    Args:
        total_imgs (int): total number of images to generate
    """
    df = pd.DataFrame(columns = ["background", "character", "object", "generated image"])

    for num in range(total_imgs):
        background = np.random.choice(np.arange(0,len(backgrounds)), p=[0.3, 0.3, 0.3, 0.1])
        background = backgrounds[background]
        
        character = np.random.choice(np.arange(0,len(characters)), p=[0.4, 0.3, 0.2, 0.095, 0.005])
        character = characters[character]

        object = np.random.choice(np.arange(0,len(objects)), p=[0.3, 0.2, 0.1, 0.1, 0.1, 0.05, 0.05, 0.04, 0.03, 0.025, 0.005])
        object = objects[object]

        generate_image(background, character, object, f"generated{num}")
        data = [background, character, object, f"generated{num}"]
        s = pd.Series(data, index=df.columns)
        df = df.append(s, ignore_index=True)

    df.to_csv('data.csv', index=False)




def uploadNFT(filename):

    url = "https://api.nft.storage/upload"

    output_file = path.join(output_folder, f"{filename}.png")

    # payload="<file contents here>"
    payload = open(output_file, "rb")
    headers = {
    'Authorization': 'Bearer nowayjose',
    'Content-Type': 'image/png'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

    js = json.loads(response.text)
    if js['ok'] == True:
        print("ok true")
        print (js['value']['cid'])

        return str(js['value']['cid']) + ".ipfs.dweb.link"
    
    print ("ok false")
    return "none"



def generate_random_img(filename, git, steps, calories, targets, targetc, targetg, ts):
    """Generates a given number of random images according to  probabilities
    Args:
        total_imgs (int): total number of images to generate
    """
    # df = pd.DataFrame(columns = ["background", "character", "object", "generated image"])

    df = {}
    df['name'] = filename
    df['git'] = git
    df['steps'] = steps
    df['calories'] = calories
    # df['target'] = target
    df['timestamp'] = ts

    d0 = 0.001
    d1 = calories/targetc
    d2 = steps/targets
    d3 = git/targetg
    d4 = git/steps
    d5 = calories/steps
    d6 = steps/targets
    d7 = git/targetg
    d8 = calories/targetc
    d9 = git/steps
    d10 = calories/steps

    br1 = d1/(d1 + d2 + d3 + d4)
    br2 = d2/(d1 + d2 + d3 + d4)
    br3 = d3/(d1 + d2 + d3 + d4)
    br4 = d4/(d1 + d2 + d3 + d4)
    
    print (br1, br2, br3, br4)
    print (br1 + br2 + br3 + br4)

    cr1 = d1/(d1 + d2 + d3 + d4 + d5)
    cr2 = d2/(d1 + d2 + d3 + d4 + d5)
    cr3 = d3/(d1 + d2 + d3 + d4 + d5)
    cr4 = d4/(d1 + d2 + d3 + d4 + d5)
    cr5 = d5/(d1 + d2 + d3 + d4 + d5)

    or0 = d0/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or1 = d1/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or2 = d2/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or3 = d3/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or4 = d4/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or5 = d5/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or6 = d6/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or7 = d7/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or8 = d8/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or9 = d9/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)
    or10 = d10/(d0 + d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10)




    background = np.random.choice(np.arange(0,len(backgrounds)), p=[br1, br2, br3, br4])
    background = backgrounds[background]
    
    character = np.random.choice(np.arange(0,len(characters)), p=[cr1, cr2, cr3, cr4, cr5])
    character = characters[character]

    object = np.random.choice(np.arange(0,len(objects)), p=[or0, or1, or2, or3, or4, or5, or6, or7, or8, or9, or10])
    object = objects[object]

    generate_image(background, character, object, f"generated{filename}")



    df['image'] = uploadNFT( f"generated{filename}")

    data = [background, character, object, f"generated{filename}", df]
    print (data)

    return df

    # s = pd.Series(data, index=df.columns)
    # df = df.append(s, ignore_index=True)

    # df.to_csv('data.csv', index=False)





# if __name__ == "__main__":
#     #generate_all_imgs()
#     # generate_random_imgs(500)
#     generate_random_img('testfile2', 20, 12000, 1850, 15000, 2500, 25, 24587597)
