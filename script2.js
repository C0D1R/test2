(() => {
    let clubData = null;
    const createWorker = url => {
        return new Promise((resolve, reject) => {
            const worker = new Worker('worker.js');
            worker.postMessage(url);
            worker.onmessage = event => {
                resolve(event.data);
            };
            worker.onerror = event => {
                reject(event.error);
            };
        });
    };
    createWorker('./STUST-Club.json')
            .then((data) => {
                const list = document.getElementsByClassName('list');
                clubData = data[list.length];
                for(let i = list.length-1; i >= 0; i--) {
                    list[i].innerHTML += data[i].join().replace(/,/g, '');
                }
            }, (error) => {
                console.error(error);
            })
            .finally(() => {
            });
    const bd = document.getElementById('bd');
    bd.addEventListener('click', event => {
        console.log(event);
        if(event.target.nodeName !== 'INPUT' || event.target.type === 'checkbox') {
            return;
        }
        console.log(event);
        if(event.target.defaultValue === 'clone') {
            document.getElementById('p').remove();
            return;
        }
        const clubIndex = event.target.defaultValue;
        const div = document.createElement('div');
        div.id = 'p';
        div.classList = 'a';
        div.innerHTML = `
                        <div class="nav">
                            <div class="nav__title">${clubData[clubIndex].name}</div>
                            <label>
                                <input type="button" name="" value="clone" class="sr-only">
                                <div class="cross"></div>
                            </label>
                        </div>
                        <main class="main">
                            <div>
                                <div class="main__name">${clubData[clubIndex].name}</div>
                            </div>
                            <div>
                                <div class="main__title">??????</div>
                                <div class="main__content">${clubData[clubIndex].content}</div>
                            </div>
                            ${
                            (clubData[clubIndex].link.length === 0) ? "" : `
                            <div>
                                <div class="main__title">??????</div>
                                <div>
                                    <a href="${clubData[clubIndex].link}">
                                        <img src="./img/${/Instagram|IG/gi.test(clubData[clubIndex].link) ?
                                                    "instagram" :
                                                    /Facebook|FB/gi.test(clubData[clubIndex].link) ?
                                                    "facebook" :
                                                    /Line/gi.test(clubData[clubIndex].link) ?
                                                    "line":"#"}.png" alt="">
                                    </a>
                                </div>
                            </div>
                            `
                            }
                        </main>
                        `;
        document.getElementById('bd').insertBefore(div, document.getElementById('form'));
    }, false);
})();