# Images encryptor

Console app to encrypt and decrypt *.bmp, *.tga, *.ppm images.

## Getting Started

To run this app, you need to install on yout machine NODE and NPM.

### Installing

After clonning this project you need to use:

```
npm install
```

### Usage

To encrypt or decrypt an image, you need to pass arguments, for exapmle:

Image to process:

```
--img=image.bmp
```

Type of process:

```
--enc or --dec
```

Algorithm to use:

```
--sdes or --des
```

Key ( if you don't pass any key, default key will be used ):

For SDES ( 8 characters long in binary ):

```
--key=00000000
```

For DES ( 16 characters long in hex ):

```
--key=ffffffffffffffff
```

Exaplme usage ( in src folder ):

```
node index.js --des --enc --img=yoda.bmp
```