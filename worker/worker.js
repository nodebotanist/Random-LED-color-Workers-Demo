addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const { random_color } = wasm_bindgen;
    await wasm_bindgen(wasm)
    let randomColor = random_color(Math.floor(Math.random() * 256))
    return new Response(randomColor, {status: 200})
}
