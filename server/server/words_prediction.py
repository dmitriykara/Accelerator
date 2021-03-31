import codecs

letters_encoding = {"й":1, "ц":1, "у":1, "ф":1, "ы":1, "в":1, "ы":1,"в":1, "я":1,"ч":1, "с":1,"к":2,"е":2, "ё":2, "а":2,"п":2,"м":2,"и":2,
"н":3,"г":3,"ш":3,"р":3,"о":3,"л":3,"т":3,"ь":3, "-":3, "щ":4,"з":4,"х":4,"ъ":4,"д":4,"ж":4,"э":4,"б":4,"ю":4}

def encode_word(word):    
    numeral_performance = ""
    word = word.rstrip()
    for i in word:
        numeral_performance += str(letters_encoding[i])
    return numeral_performance

def read_dict():
    with codecs.open("word_rus.txt", encoding='utf-8') as f:
        lines = f.readlines()
    dict = {}
    for line in lines:
        line = line.strip()
        dict[line] = encode_word(line)
    return dict

def search_word(numeric, dict):
    output = []
    for item, value in dict.items():
        if value.startswith(numeric):
            output.append(item)
    output = sorted(output, key=len)
    return output 
    

dict = read_dict()
while True:
    w = input()
    print(search_word(encode_word(w), dict))

