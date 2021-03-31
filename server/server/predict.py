import random
import codecs

letters = {
    "Left": "йцуфывячс",
    "Right": "нгшролть",
    "Forward": "щзхъджэбю",
    "Backward": "кеапми",
}

letters_encoding = {"й":1, "ц":1, "у":1, "ф":1, "ы":1, "в":1, "ы":1,"в":1, "я":1,"ч":1, "с":1,"к":2,"е":2, "ё":2, "а":2,"п":2,"м":2,"и":2,
"н":3,"г":3,"ш":3,"р":3,"о":3,"л":3,"т":3,"ь":3, "-":3, "щ":4,"з":4,"х":4,"ъ":4,"д":4,"ж":4,"э":4,"б":4,"ю":4}

def encode_word(word: str) -> str:    
    numeral_performance = ""
    word = word.rstrip()
    for i in word:
        numeral_performance += str(letters_encoding[i])
    return numeral_performance

def read_dict() -> dict:
    with codecs.open("word_rus.txt", encoding='utf-8') as f:
        lines = f.readlines()
    d = {}
    for line in lines:
        line = line.strip()
        d[line] = encode_word(line)
    return d

word = ""
pred1 = ""
pred2 = ""
text = ""
pdict = read_dict()

def search_word(numeric: int) -> list:
    global pdict
    output = []
    for item, value in pdict.items():
        if value.startswith(numeric):
            output.append(item)
    output = sorted(output, key=len)
    return output 

def get_text(selection: str = "") -> str:
    global text
    if text == "":
        text = selection
    elif selection != "":
        text += f" {selection}"
    return text

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

    word += letter
    preds = search_word(encode_word(word))
    if len(preds) == 0:
        pred1 = word + letter
        pred2 = word + letter
    elif len(preds) == 1:
        pred1 = preds[0]
        pred2 = word + letter
    else:
        pred1 = preds[0]
        pred2 = preds[1]
    
    return [pred1, pred2]
    