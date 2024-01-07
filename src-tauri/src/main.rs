// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn download(link: &str, case: u32) -> String {
    if case == 0 {
        Command::new("spotdl")
            .arg(&link)
            .status()
            .expect("did not work");
    } else {
        Command::new("yt-dlp")
            .arg(&link)
            .status()
            .expect("did not work");
    }

    format!("Download {link} complete!")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
