//
//  UITextView+.swift
//  RichText
//
//  Created by Filipe Degrazia on 05/11/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

extension UITextView {
  var attributedTextHtml: String {
    let htmlData = try? self.attributedText.data(from: NSRange(location: 0, length: self.attributedText.length), documentAttributes:[.documentType: NSAttributedString.DocumentType.html]);
    return String.init(data: htmlData ?? Data(), encoding: String.Encoding.utf8) ?? ""
  }
}
