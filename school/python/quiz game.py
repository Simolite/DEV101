print("Welcome")
playing = input("Do you want to play ? ")
if playing.lower() != "yes":
    quit()
print("okay")
score = 0
answer = input("what year is it ? ")
if answer.lower() == '2025' :
    print("correct")
    score += 1
else :
    print("wrong")
answer = input("what counter has paris ? ")
if answer.lower() == 'france' :
    print("correct")
    score += 1
else :
    print("wrong")

print('you score is '+ str(score))