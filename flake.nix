{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      forAllSystems = function:
        nixpkgs.lib.genAttrs [
          "x86_64-linux"
          "aarch64-darwin"
        ]
          (system: function nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell rec {
          buildInputs = with pkgs;
            [
              nodejs_21
              spotdl
              rustc
              rustfmt
              rust-analyzer
              cargo
            ]
            ++ lib.optionals
              stdenv.isDarwin
              (with pkgs.darwin; [
                clang
                libiconv
              ])
            ++ (with pkgs.darwin.apple_sdk.frameworks; [
              Carbon
              WebKit
              Cocoa
            ]);

          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath buildInputs;
        };
      });
    };
}
