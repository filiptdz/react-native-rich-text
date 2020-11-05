//
//  RichTextEditor.m
//  RichText
//
//  Created by Filipe Degrazia on 03/11/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTViewManager.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(RNRTEditor, NSObject)

RCT_EXPORT_VIEW_PROPERTY(value, NSString)
RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTDirectEventBlock)
RCT_EXTERN_METHOD(
  setStyleFromManager:(nonnull NSNumber *)node
  style:(nonnull NSString *)style
)

@end
