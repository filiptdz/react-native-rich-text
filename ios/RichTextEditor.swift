//
//  RichTextEditor.swift
//  RichText
//
//  Created by Filipe Degrazia on 03/11/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

@objc(RNRTEditor)
class RichTextEditorManager: RCTViewManager {
  override func view() -> UIView! {
    return RichTextEditor()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc func setStyleFromManager(_ node: NSNumber, style: NSString) {
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view(
        forReactTag: node
      ) as! RichTextEditor
      component.setStyle(style: String(style))
    }
  }
}

class RichTextEditor: UIView, UITextViewDelegate {
  var textView: UITextView!
  @objc var value: NSString = "" {
    didSet {
      let htmlData = value.data(using: String.Encoding.unicode.rawValue)
      let options = [NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.html]
      let attributedString = try? NSMutableAttributedString(data: htmlData ?? Data(), options: options, documentAttributes: nil)
      if attributedString != nil {
        attributedString!.addAttribute(.font, value: UIFont.systemFont(ofSize: 15), range: NSRange(0...(attributedString!.length - 1)))
        textView.attributedText = attributedString
      }
      if onChangeText != nil {
        onChangeText!(["newValue": textView.attributedTextHtml])
      }
    }
  }
  @objc var onChangeText: RCTDirectEventBlock?

  override init(frame: CGRect) {
    super.init(frame: frame)
    textView = UITextView()
    textView.delegate = self
    textView.frame = frame
    textView.backgroundColor = #colorLiteral(red: 0.4392156899, green: 0.01176470611, blue: 0.1921568662, alpha: 1)
    textView.text = "Enter your text"
    textView.textAlignment = .center
    textView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    self.addSubview(textView)
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func textViewDidChange(_ textView: UITextView) {
    if onChangeText != nil {
      onChangeText!(["newValue": textView.attributedTextHtml])
    }
  }
}
