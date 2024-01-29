// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

use serde::Serialize;
use tauri::{api::dialog, CustomMenuItem, Menu, MenuItem, Runtime, Submenu, Window};

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
    let import = CustomMenuItem::new("import", "Import");

    let submenu = Submenu::new(
        "File",
        Menu::new().add_item(import).add_native_item(MenuItem::Quit),
    );
    let menu = Menu::new().add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "import" => dialog::FileDialogBuilder::default().pick_file(|path| match path {
                Some(path) => {
                    let path = path.to_string_lossy();
                    println!("{path}")
                }
                _ => println!("none"),
            }),

            "quit" => std::process::exit(0),
            _ => println!("None"),
        })
        .invoke_handler(tauri::generate_handler![processqueue])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
