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
}

class RichTextEditor: UIView, UITextViewDelegate {
  var textView: UITextView!
  @objc var value: NSString = "" {
    didSet {
      textView.text = String(value)
      if onChangeText != nil {
        onChangeText!(["newValue": textView.text])
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
      onChangeText!(["newValue": textView.text])
    }
  }
}
