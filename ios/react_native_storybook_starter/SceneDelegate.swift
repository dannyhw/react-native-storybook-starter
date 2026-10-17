import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import UIKit

// Apps built with the iOS 27 SDK must use the scene-based life cycle.
class SceneDelegate: RCTDefaultReactNativeFactoryDelegate, UIWindowSceneDelegate {
  var window: UIWindow?
  var reactNativeFactory: RCTReactNativeFactory?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else {
      return
    }

    // iOS only emits pointer and click events when W3C pointer events are on.
    RCTSetDispatchW3CPointerEvents(true)
    dependencyProvider = RCTAppDependencyProvider()
    // Canary enables the EventTarget imperative API (addEventListener etc.) on native refs.
    reactNativeFactory = RCTReactNativeFactory(delegate: self, releaseLevel: RCTReleaseLevel.Canary)
    window = UIWindow(windowScene: windowScene)

    #if DEBUG
      reactNativeFactory?.devMenuConfiguration = RCTDevMenuConfiguration(
        devMenuEnabled: true,
        shakeGestureEnabled: true,
        keyboardShortcutsEnabled: true
      )
    #endif

    reactNativeFactory?.startReactNative(
      withModuleName: "react_native_storybook_starter",
      in: window,
      connectionOptions: connectionOptions
    )
  }

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    // RCTLinkingManager only forwards the first context, so pass them one at a time.
    for context in URLContexts {
      RCTLinkingManager.scene(scene, openURLContexts: [context])
    }
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.scene(scene, continue: userActivity)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
