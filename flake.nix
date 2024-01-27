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
              rustc
              rustfmt
              cargo
            ]
            ++ (
              if pkgs.stdenv.isDarwin
              then
                with pkgs;
                [
                  clang
                  darwin.libiconv
                ]
                ++ (with pkgs.darwin.apple_sdk.frameworks; [
                  Carbon
                  WebKit
                  Cocoa
                ])
              else [ ]
            );
        };
      });
    };
}
