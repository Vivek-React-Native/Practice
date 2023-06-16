#import "AppDelegate.h"
#import <Firebase.h>
#import "RNSplashScreen.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Practice";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  // [RNSplashScreen show];
  // return [super application:application didFinishLaunchingWithOptions:launchOptions];

  [GMSServices provideAPIKey:@"AIzaSyAi_FD9xNCdX7dX10TKlW0CfrY-LiK6YX0"];
  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];  // here
  [FIRApp configure];
  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
