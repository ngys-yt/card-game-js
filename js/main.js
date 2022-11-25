'use strict';

window.onload = function () {
    // カードの配列作成
    let cards = [];

    // トランプのマーク作成
    const suits = ['s', 'd', 'h', 'c'];

    // トランプのマークの数だけ回す(4回)
    for (let i = 0; i < suits.length; i++) {
        // 同じマークの枚数だけ回す(13回)
        for (let j = 1; j <= 13; j++) {
            // imageファイルの名前作成
            cards.push(`${suits[i]}${j < 10 ? '0' : ''}${j}.gif`);
        }
    }

    // シャッフル関数
    function shuffle() {
        let i = cards.length;
        while (i) {
            let index = Math.floor(Math.random() * i--);

            // カードの配列入れ替え

            // card[index]のトランプをtempに一時保存
            let temp = cards[index];
            // card[index]のトランプにcard[i]のトランプを上書き
            cards[index] = cards[i];
            // tempに保存したcard[index]をcard[i]に上書き
            cards[i] = temp;
        }
    }

    shuffle(); // シャッフル呼び出し

    // HTMLいじってるところ
    const table = document.getElementById('table');
    for (let i = 0; i < suits.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 13; j++) {
            let td = document.createElement('td');
            td.classList.add('card', 'back');
            td.onclick = flip; // flip関数呼び出し
            td.style.backgroundImage = `url(images/${cards[i * 13 + j]})`;
            let cardNum = cards[i * 13 + j].substring(1);
            td.accessKey = cardNum;
            td.id = i * 13 + j;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // カードをめくる
    let firstCard = null;

    function flip(e) {
        let td = e.target;
        // 裏表の判定
        if (!td.classList.contains('back')) {
            return; //表のカードをクリックしても何もしない。
        } else {
            td.classList.remove('back'); //カードを表にする。
        }

        // 何枚めくったかの判定
        if (firstCard === null) {
            return (firstCard = td); //1枚目だったら今めくったカードをfirstCardに設定
        // 2枚目めくったとき
        } else {
            const none = document.getElementsByTagName('td');
            for (let i = 0; i < none.length; i++) {
                none[i].classList.add('none');
            }
            // 揃ったとき
            if (firstCard.accessKey === td.accessKey) {
                window.setTimeout(function () {
                    firstCard.style.visibility = 'hidden';
                    td.style.visibility = 'hidden';
                    firstCard = null;
                    for (let i = 0; i < none.length; i++) {
                        none[i].classList.remove('none');
                    }
                }, 1200);

            // 揃わんかったとき
            } else {
                window.setTimeout(function () {
                    firstCard.classList.add('back');
                    td.classList.add('back');
                    firstCard = null;
                    for (let i = 0; i < none.length; i++) {
                        none[i].classList.remove('none');
                    }
                }, 1200);
            }
        }
    }
};