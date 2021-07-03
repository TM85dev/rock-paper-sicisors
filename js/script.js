$(document).ready(function() {

    let comp = [        // LINKS FOR IMAGES
        {
            id: 0,
            name: "rock",
            src: "./assets/rock.png"
        },
        {
            id: 1,
            name: "paper",
            src: "./assets/paper.png"
        },
        {
            id: 2,
            name: "sicisors",
            src: "./assets/sicisors.png"
        }    
    ];
    let count = 0;  // COUNTING FOR DISPLAY IN TABLE ROWS
    let pts = 0;    // POINTS IN GAME
    
    $("button").click(function() { 
        const random = Math.floor(Math.random() * 3);
        $("button").css({ pointerEvents: "none" });
        setTimeout(() => $("button").css({ pointerEvents: "auto" }), 600);
        
        if(count === 7) count = 0;
        if($(this).attr("id") === "rock") {                             // CHOOSE ROCK //
            changingImages(0);
            if(random === 0) tableLogic("rock", "rock", "draw");    // DRAW GAME
            else if(random === 1) {                                 // LOSE GAME
                pts -= 100;
                tableLogic("rock", "paper", "lose");
                points("-100 pts", "removing-points");
            }
            else {                                                  // WIN GAME
                pts += 100;
                tableLogic("rock", "sicisors", "win");
                points("+100 pts", "adding-points");
            }
        }
        else if($(this).attr("id") === "paper") {                       // CHOOSE PAPER //
            changingImages(1)
            if(random === 0) {                                      // WIN GAME
                pts += 100;
                tableLogic("paper", "rock", "win");
                points("+100 pts", "adding-points");
            }
            else if(random === 1) {                                 // DRAW GAME
                tableLogic("paper", "paper", "draw");
            }
            else {                                                  // LOSE GAME
                pts -= 100;
                tableLogic("paper", "sicisors", "lose");
                points("-100 pts", "removing-points");
            }
        }
        else {                                                          // CHOOSE SICISORS //
            changingImages(2)
            if(random === 0) {                                      // LOSE GAME
                pts -= 100;
                tableLogic("sicisors", "rock", "lose");
                points("-100 pts", "removing-points");
            }
            else if(random === 1) {                                 // WIN GAME
                pts += 100;
                tableLogic("sicisors", "paper", "win");
                points("+100 pts", "adding-points");
            }
            else {                                                  // DRAW GAME
                tableLogic("sicisors", "sicisors", "draw");
            }
        }
        
        for(let i=-1000; i<=1000; i+=100) {             // PROGRESS BAR ANIMATION
            if(pts === i && i<0) {
                minusProgressBar();
            }
            else if(pts === i && i===0) {
                minusProgressBar();
                setTimeout(() => {
                    $(".bar-progress").css({margin: "0 auto"});
                },400)
            }
            else if(pts===i && i>0) {
                plusProgressBar();
            }
        }
        
        count++;                                              // NUMBER ON TABLE LIST

        function tableLogic(player, computer, result) {      // ADDING CURRENT TABLE ROW
            $("tbody>tr").eq(count).find("td").eq(0).text(`${player} vs ${computer}`);
            $("tbody>tr").eq(count).find("td").eq(1).text(result);
            $("tbody>tr").eq(count).find("td").eq(2).text(pts + " pts");

            // ANIMATION IN TABLE
            $("tbody>tr").transition({
                color: "white"
            }, 0)
            $("tbody>tr").eq(count).transition({
                opacity: 0,
                x: 100,
                color: "red"
            }, 0).transition({
                opacity: 1,
                x: 0
            }, 400);
            $("tbody>tr").eq(count).find("td").eq(1).text(result);

        }

        function changingImages(id) {       // CHANGE IMAGES
            $("#player").css("background-image", `url(${comp[id].src})`);
            $("#computer").css("background-image", `url(${comp[random].src})`);
        }

        function points(points, id) {    // DISPLAY POINTS
            $(`<span id=${id}>${points}</span>`).appendTo(".bar");
            $(`#${id}:last-of-type`).transition({
                opacity: 1,
                y: -80
            }, 600).transition({
                opacity: 0
            }, 600)
            setTimeout(() => {
                $(`#${id}:first-of-type`).remove();
            }, 1200)
            $(".bar-progress span").text(`${pts*0.1}%`);    // DISPLAY PROGRESS IN %
        }

        function minusProgressBar() {   // PRIGRESS BAR FROM 0 TO -100%
            $(".bar-progress").transition({
                width: `${Math.abs(pts)*0.05}%`,
                marginRight: "50%"
            })
            if(pts<=-700) {
                $(".bar-progress").transition({
                    backgroundColor: "red"
                }, 400);
                $(".bar-progress").addClass("blink-red");
            }
            else if(pts<=0) {
                $(".bar-progress").attr("class", "bar-progress");
                $(".bar-progress").transition({
                    backgroundColor: "orange"
                }, 400)
            }
        }
        function plusProgressBar() {    // PROGRESS BAR FROM 0 TO 100%
            $(".bar-progress").transition({
                width: `${Math.abs(pts)*0.05}%`,
                marginLeft: "50%"
            })
            if(pts<=500) {
                $(".bar-progress").transition({
                    backgroundColor: "green"
                }, 400);
            }
            else if(pts<=1000) {
                $(".bar-progress").transition({
                    backgroundColor: "teal"
                }, 400)
            }
        }

        if(pts>=1000) {             // WIN GAME
            endGame();
            $("<h2>Congratulations!<br>You have won!</h2>").appendTo(".overlay");
        }
        else if(pts<=-1000) {       // LOSE GAME
            endGame();
            $("<h2>Too bad!<br>You have lost!</h2>").appendTo(".overlay");
        }
        function endGame() {    // END GAME
            $(`
                <div class='overlay'>
                    <button class='btn btn-outline-primary'>PLAY AGAIN</button>
                </div>
            `).appendTo("body");
            $(".overlay button").click(() => {
                window.location.reload();
            })
        }
    })
})