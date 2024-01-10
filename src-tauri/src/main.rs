// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command(async)]
fn download(link: &str, case: u32, path: &str) -> String {
    if case == 0 {
        Command::new("spotdl")
            .arg(&link)
            .current_dir(&path)
            .output()
            .expect("did not work");
        format!("done")
    } else {
        Command::new("yt-dlp")
            .arg(&link)
            .current_dir(&path)
            .output()
            .expect("did not work");
        format!("done")
    }
}

fn main() {
    let _ = fix_path_env::fix();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
