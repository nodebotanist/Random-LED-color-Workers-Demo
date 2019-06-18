extern crate cfg_if;
extern crate wasm_bindgen;
extern crate css_colors;

mod utils;

use css_colors::{Color, hsl};
use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn random_color(hue:i32) -> String {
    let new_color = hsl(hue, 100, 50);
    new_color.to_rgb().to_css()
}
