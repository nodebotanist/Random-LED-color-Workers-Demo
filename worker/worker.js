addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const { random_color } = wasm_bindgen;
    await wasm_bindgen(wasm)
    let randomColor = random_color(Math.floor(Math.random() * 256)).replace('rgb(', '').replace(')', '').split(',')
    console.log({
        r: randomColor[0],
        g: randomColor[1],
        b: randomColor[2]
    })
    let jwt
    jwt = await fetch('https://jwt-dispenser.kas.workers.dev', {
        method: 'POST',
        body: JSON.stringify({r: randomColor[0], g: randomColor[1], b: randomColor[2]})
    }).then(response => response.text().then(token => (jwt = token)));
    console.log(jwt)
    await fetch("https://color-queue.kas.workers.dev", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt
        }
    });
    return new Response(`Color added: ${JSON.stringify({r: randomColor[0], g: randomColor[1], b: randomColor[2]})}`, {
      status: 200
    });
}
