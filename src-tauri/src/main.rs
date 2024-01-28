// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

use serde::Serialize;
use tauri::{Runtime, Window};

#[derive(Clone, Serialize)]
struct ProgressPayload {
    id: String,
    index: u32,
    progress: u32,
}

#[tauri::command]
async fn processqueue<R: Runtime>(
    window: Window<R>,
    links: Vec<String>,
    path: &str,
) -> Result<(), ()> {
    for (index, link) in links.iter().enumerate() {
        if link.contains("youtube") {
            println!("yt");

            let ytd = Command::new("yt-dlp")
                .arg(&link)
                .current_dir(&path)
                .status()
                .expect("did not work");

            println!("{ytd}");

            let _ = window.emit(
                "download://progress",
                ProgressPayload {
                    id: link.to_string(),
                    index: index as u32,
                    progress: 100 as u32,
                },
            );
        } else if link.contains("spotify") {
            println!("spot");
            let spotd = Command::new("spotdl")
                .arg(&link)
                .current_dir(&path)
                .status()
                .expect("did not work");

            println!("{spotd}");

            let _ = window.emit(
                "download://progress",
                ProgressPayload {
                    id: link.to_string(),
                    index: index as u32,
                    progress: 100 as u32,
                },
            );
        } else {
            let ytd = Command::new("yt-dlp")
                .arg(&link)
                .current_dir(&path)
                .status()
                .expect("did not work");

            println!("{ytd}");

            let _ = window.emit(
                "download://progress",
                ProgressPayload {
                    id: link.to_string(),
                    index: index as u32,
                    progress: 100 as u32,
                },
            );
        }
    }
    Ok(println!("Done"))
}

fn main() {
    let _ = fix_path_env::fix();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![processqueue])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
