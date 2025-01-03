import random
rnum = int(random.randrange(31))
gnum = int(input('gusse the number from 0 to 30 \n'))
while True :
    if rnum == gnum :
        print("good job")
        break
    else:
        if rnum > gnum :
            gnum = int(input('incorrect the number you gessed is smalle try again \n'))
        else:
            gnum = int(input('incorrect the number you gessed is big try again \n'))
