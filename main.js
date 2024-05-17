function player(character) {
    var score = 0;
    var plays = 0;
    const increase_score = () => score++;
    const get_score = () => score;
    const increase_plays = () => plays++;
    const get_plays = () => plays;
    return {
        character, get_score, increase_score, increase_plays, get_plays, plays,score
    };
}

const Xscore = document.querySelector('.x-score');
const Oscore = document.querySelector('.o-score');
const player1 = player('x');
const player2 = player('o');
let numberOfPlays = 0;

let grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const reset_grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function checkWinner(grid) {
    // التحقق من الصفوف والأعمدة
    for (let i = 0; i < 3; i++) {
        let row = '';
        let col = '';
        for (let j = 0; j < 3; j++) {
            row += grid[i][j];
            col += grid[j][i];
        }
        if (row === 'xxx' || row === 'ooo' || col === 'xxx' || col === 'ooo') {
            return [true, row, col];
        }
    }

    // التحقق من القطر الرئيسي
    let primaryDiagonal = '';
    for (let i = 0; i < 3; i++) {
        primaryDiagonal += grid[i][i];
    }
    if (primaryDiagonal === 'xxx' || primaryDiagonal === 'ooo') {
        return [true, primaryDiagonal];
    }

    // التحقق من القطر الفرعي
    let secondaryDiagonal = '';
    for (let i = 0; i < 3; i++) {
        secondaryDiagonal += grid[i][2 - i];
    }
    if (secondaryDiagonal === 'xxx' || secondaryDiagonal === 'ooo') {
        return [true, secondaryDiagonal];
    }

    // إذا لم يكن هناك فائز
    return false;
}
// اختبار الدالة
// if (checkWinner(grid)) {
//     console.log('هناك فائز!');
// } else {
//     console.log('لا يوجد فائز حتى الآن.');
// }

function resetGrid() {
    grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    divs.forEach((element) => {
        element.textContent = '';
        element.classList.remove('x', 'o')
    });
}



const divs = document.querySelectorAll('.square')
// console.log(divs)

divs.forEach((element, index) => {
    element.addEventListener("click", () => {
        const row = Math.floor(index / 3); // الصف
        const col = index % 3; // العمود
        if (grid[row][col] === '') {
            if (player1.get_plays() <= player2.get_plays()) {
                element.classList.add('x');
                grid[row][col] = 'x';
                element.textContent = 'x';
                player1.increase_plays();
                // console.log('player1', player1.get_plays())
            }
            else {
                element.classList.add('o');
                grid[row][col] = 'o';
                player2.increase_plays();
                element.textContent = 'o';
                // console.log('player2', player2.get_plays())
            }
            // عندما يفوز أحد اللاعبين، قم بإعادة تعيين المصفوفة
            if (checkWinner(grid)) {
                // console.log('هناك فائز!');
                if (checkWinner(grid)[1] === 'xxx' || checkWinner(grid)[2] === 'xxx') {
                    // console.log(checkWinner(grid)[0], checkWinner(grid)[1],checkWinner(grid)[2]);
                    player1.increase_score()
                    Xscore.textContent = player1.get_score();
                    // if(player1.get_score() == 3){
                    //     player1.score = 0;
                    //     // alert('X wins !!!!!!');
                    // }
                }
                else {
                    // console.log(checkWinner(grid)[0], checkWinner(grid)[1]);
                    player2.increase_score()
                    Oscore.textContent = player2.get_score();
                    // if(player2.get_score() == 3){
                    //     alert('O wins !!!!!!');
                    //     player2.score = 0;
                    // }
                }

                resetGrid(); // إعادة تعيين المصفوفة
                numberOfPlays = 0;
                
            } else {
                console.log('لا يوجد فائز حتى الآن.');
                numberOfPlays++; 
                if (numberOfPlays == 9) {
                    resetGrid();
                    numberOfPlays = 0;
                    alert('It`s Draw')
                }
            }
            // console.log(element.classList);
            // console.log(reset_grid);
        }
    })
})

