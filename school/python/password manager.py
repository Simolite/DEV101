from cryptography.fernet import Fernet

def key_gen():
    key = Fernet.generate_key()
    with open('key.key','wb') as key_f :
        key_f.write(key)

def key_load():
    file = open('key.key','rb')
    key = file.read()
    file.close()
    return key

def view() :
    print()
    with open('password.txt','r') as f :
        for line in f.readlines():
            data = line.rstrip()
            user,passw = data.split('|')
            print(user,':',fer.decrypt(passw.encode()).decode())
    print()

def add() :
    name = input('name ? ')
    password = input('password ? ')
    with open('password.txt','a') as f:
        f.write(name + '|' + fer.encrypt(password.encode()).decode() + "\n")

fer = Fernet(key_load())

while True:
    mode = input('add , view or quit ? ').lower()
    if mode == 'view' or mode == 'v' :
        view()
    elif mode == 'add' or mode == 'a':
        add()
    elif mode == 'quit' or mode == 'q' :
        break
    elif mode == 'creat_key_file':
        key_gen()
    else:
        print('invalid')
        continue