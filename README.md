# RPS Game
## Simple rock-paper-sicisors game

### I. Information about game.
It's simple, popular game where you can select one from three options (rock, paper or sicisors) and compare it with your opponent. If your selected option is better than opponent you get points, or lose if you choose wrong. There's some patterns like: 
1. rock win with sicisors, but lose with paper;
2. paper win with rock, but lose with sicisors;
3. sicisors win with paper, but lose with rock;
4. the same option like sicisors vs sicisors it draw.

There is also progress bar where you can track your progress. For every win you earn 100 points (it's 10% of progress bar). Every lost you lose 100 points. If you draw then nothing happens. After progress bar has -100% or 100% the game will be over.
There is also table with details about current game. Table has 7 rows where you can track game history. Every move update table. Current move is saved with red color. 

### II. Technology used in project.
1. [Bootstrap](https://getbootstrap.com/) - library for building responsive web pages.
2. [jQuery](https://jquery.com/) - a library that makes javascript easier to use.
3. [SASS](https://sass-lang.com/) - stylesheet language that is compiled to CSS.

### III. Structure files.
1. **index.html** - main file for display game. Include css and JavaScript files.
2. **assets** - catalog with images (*.png files).
3. **css** - catalog with styles.
5. **js** - catalog with JavaScript files.
