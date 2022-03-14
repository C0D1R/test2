(() => {
    const getJson = url => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                if(request.status == 200) {
                    resolve(JSON.parse(request.responseText));
                }
                else {
                    reject(new Error(request));
                }
            };
            request.send(null);
        });
    },
    AddList = data => {
        let html = [[], [], [], [], [], [], [], []];
        for(let i = data.length-1, dataTemp = ''; i >= 0 && (dataTemp = data[i]); i--) {
            const htmlTemp = `
                             <label>
                                 <input type="button" name="club" value="${i}" class="sr-only">
                                 <div class="btn btna">${dataTemp.name}</div>
                             </label>
                             `;
            switch(dataTemp.group) {
                case '體能性':
                    html[0].push(htmlTemp);
                    break;
                case '康樂性':
                    html[1].push(htmlTemp);
                    continue;
                case '聯誼性':
                    html[2].push(htmlTemp);
                    continue;
                case '服務性':
                    html[3].push(htmlTemp);
                    continue;
                case '學藝性':
                    html[4].push(htmlTemp);
                    continue;
                case '自治性組織':
                    html[5].push(htmlTemp);
                    continue;
                case '自治性(系學會)':
                    html[6].push(htmlTemp);
                    continue;
                case '行政及學術單位':
                    html[7].push(htmlTemp);
                    continue;
            }
        }
        html.push(data);
        return html;
    };
    self.addEventListener('message', event => {
        getJson(event.data)
            .then((data) => {
                self.postMessage(AddList(data));
            }, (error) => {
                console.error(error);
            })
            .finally(() => {
                self.close();
            });
    });
})();