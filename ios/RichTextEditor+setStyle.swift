//
//  RichTextEditor+setStyle.swift
//  RichText
//
//  Created by Filipe Degrazia on 05/11/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

extension RichTextEditor {
  @objc func setStyle(style: String) {
    let richTextStyle = RichTextStyle(rawValue: style)
    if let richTextStyle = richTextStyle {
      let mutableAttributedText = NSMutableAttributedString(attributedString: textView.attributedText)
      switch richTextStyle {
      case .bold:
        mutableAttributedText.addAttribute(.font, value: UIFont.systemFont(ofSize: 15, weight: .bold), range: NSRange(0...(mutableAttributedText.length - 1)))
        break
      case .regular:
        mutableAttributedText.addAttribute(.font, value: UIFont.systemFont(ofSize: 15, weight: .regular), range: NSRange(0...(mutableAttributedText.length - 1)))
        break
      default:
        break
      }
      textView.attributedText = mutableAttributedText
    }
  }
}
