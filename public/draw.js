const ws = new WebSocket("ws://localhost:8082");

        ws.addEventListener("open", ()=>{
            console.log("Connected");
        })

        ws.addEventListener("message", e=>{
            data = JSON.parse(e.data);
            DrawPedestrialSignalLight(data);
        })

        function DrawPedestrialSignalLight(data){
            var e = document.querySelector(".pedestrial-signal-light");
            var child = e.lastElementChild; 
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
            var n = 0;
            
            for (var i = 63, copy; i >>= 0; i--){
                var string = '';
                const newRow = document.createElement('row');
                newRow.setAttribute(
                'style',
                'width: 770px;height: 10px;display:  flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: center;background-color: black;border-radius:  5px; position: relative;',
                );
                const newDot = document.createElement('dot');
                newDot.setAttribute(
                'style',
                'width: 10px;height: 10px;background-color: rgb(95, 95, 95);border-radius:  5px;position: relative;',
                );

                newRow.appendChild(newDot);
                for (var j = 0, copy2; j < 64; j++) {
                    copy2 = newDot.cloneNode(true);
                    if(data[i*64+j]==0){
                        copy2.style.backgroundColor = 'rgb(95, 95, 95)';
                    }else{
                        copy2.style.backgroundColor = "red";
                    }
                    newRow.insertBefore(copy2, newDot);
                    string += data[i*64+j];
                    n++;
                }
                copy = newRow.cloneNode(true);
                e.appendChild(copy);
            }
        }
        
        function multiplyNode(node, count, deep) {
            for (var j = 0, copy; j < count - 1; j++) {
                copy = node.cloneNode(deep);
                node.parentNode.insertBefore(copy, node);
            }
            
            row=node.parentNode;
            for (var i = 0, copy; i < count - 1; i++) {
                copy = row.cloneNode(deep);
                row.parentNode.insertBefore(copy, row);
            }
            
        }

        if (typeof window !== 'undefined') {
            console.log('You are on the browser')
        } else {
            console.log('You are on the server')
        }
        multiplyNode(document.querySelector('.dot'), 64, true);