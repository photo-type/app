package com.phototype;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.reactnativenavigation.NavigationReactPackage;
import com.remobile.toast.RCTToastPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wix.RNCameraKit.RNCameraKitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new ImageResizerPackage(),
            new NavigationReactPackage(),
            new RCTToastPackage(),
            new UploaderReactPackage(),
            new VectorIconsPackage(),
            new RNCameraKitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
      new RNCameraKitPackage(),
      new VectorIconsPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}
