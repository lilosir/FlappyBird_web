CS5413 Project2
Name: Renyuan Sheng
ID: 0553170
Game title: My flappy bird
URL: Project2 Renyuan Sheng/index.html

Overview:
	Recently, there is a popular game coming into our lives, its name is flappy bird. I am so like it that want to make my own flappy bird. After my friends' recommends, I decided to use the KineticJS to implement canvas, which can be easier than the original one. I use it add some images and animations,even some dynamic text as well. Besides, I use the latest IOS's flat UI style(the button and the background) and the bird's funny prototype, that make my game more fashion and interesting.

Controls:
	Press Space to let the bird stop going down, and by this means, the bird can through the obscales without touching.

Instructions:
	In my game, the bird will go down if there is no controlling, press the Space, the bird can fly up, so it can keep the altitude what you want.When the bird through the obstacles without touching, player can get 1 score. When the bird touches the obstacles or just touch the floor, the game will over, then the start button appears, which player can click it to play it again. This game can storage the best score and curruent socre. If you are skillful enough, be patient, keep the bird alive forever!

Three additions in my game:
1.jQuery.
2.localStorage.
3.<audio>

Game testing:
	When I was tesing, I found a bug, when the first time, the collison detection is good, after the the seconds time(continue the game), the bird sometimes did not touch the obstacles, but still fail the game. So I printout the bird's location and the obsctals's location, I found that the the array I put the locations of the obstacles did not clean, so in the second time, it still use the old one in stead of the lastest one.
 
Potential performance issues:
	At present, when the game fails, the start button is coverd by the obstacles, so it cannot be clicked at that time.

Features in the future:
	I want to add gravity affect to the bird's move. Because now Ijust let the bird up and down in the same speed, so it looks like a little fake.
