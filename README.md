# Images encryptor

Console app to encrypt and decrypt images.

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

Key ( if you don't pass any key, default key will be used ):

```
--key=00000000
```

Exaplme usage ( in src folder ):

```
node index.js --img=yoda.bmp --enc
```