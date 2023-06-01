const Path = '../Assets/Images/';
const GIF_Path = '../Assets/GIFs/';
const png = '.png';
const jpg = '.jpg';
const gif = '.gif';

const Images = {
  AppLogo: require(Path + 'AppLogo' + png),
  AppSplashScreen: require(Path + 'AppSplashScreen' + png),
  LeftArrow: require(Path + 'LeftArrow' + png),
  Image_0: require(Path + 'Image_0' + jpg),
  Image_1: require(Path + 'Image_1' + jpg),
  Image_2: require(Path + 'Image_2' + jpg),
  Image_3: require(Path + 'Image_3' + jpg),
  Lion_1: require(Path + 'Lion_1' + jpg),
  Cat_1: require(Path + 'Cat_1' + jpg),
  Dog_1: require(Path + 'Dog_1' + jpg),
  Swan_1: require(Path + 'Swan_1' + jpg),

  // GIF
  Butterfly: require(GIF_Path + 'Butterfly' + gif),
  ColorLines: require(GIF_Path + 'ColorLines' + gif),
  GirlHairs: require(GIF_Path + 'GirlHairs' + gif),
  Houses: require(GIF_Path + 'Houses' + gif),
  Sun: require(GIF_Path + 'Sun' + gif),
};

export default Images;
