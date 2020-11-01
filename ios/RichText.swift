import UIKit

@objc(RNRTEditor)
class RichTextEditorManager: RCTViewManager {
  override func view() -> UIView! {
    return RichTextEditor()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

class RichTextEditor: UIView {
  var textField: UITextField!
  @objc var value: NSString = "" {
    didSet {
      textField.text = String(value)
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    textField = UITextField()
    textField.text = "Enter your text"
    textField.textAlignment = .center
    textField.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    self.addSubview(textField)
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
