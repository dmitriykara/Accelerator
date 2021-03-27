import random

word = ""
pred1 = ""
pred2 = ""

letters = {
    "Left": "йцуфывячс",
    "Right": "нгшролть",
    "Forward": "щзхъджэбю",
    "Backward": "кеапми",
}

def get_letter(motion: str) -> str: 
    global letters
    group = letters[motion]
    letter = group[random.randint(0, len(group) - 1)]
    return letter

def get_word(letter: str) -> str:
    global word
    return word + letter

def get_predictions(letter: str = "") -> list:
    global word, pred1, pred2
    if letter == "":
        copy1 = pred1
        copy2 = pred2
        word = pred1 = pred2 =  ""
        return [copy1, copy2]
    pred1 = word + letter
    pred2 = word + '2'
    word += letter
    return [pred1, pred2]
    