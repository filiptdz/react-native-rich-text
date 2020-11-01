import UIKit

@objc(RNRTEditor)
class RichTextEditor: RCTViewManager {
  override func view() -> UIView! {
    let textField = UITextField()
    textField.text = "Enter your text"
    textField.textAlignment = .center
    return textField
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
