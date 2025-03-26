import * as vscode from "vscode";
import {
  isUntranslated,
  nextFuzzyMessage,
  nextUntranslatedMessage,
  nextUntranslatedOrFuzzyMessage,
} from "./message";
import { focusOnNextTarget } from "./focusing";
import { MessageParser } from "./message_parser";
import { Message } from "./message_type";

export function moveToNextUntranslatedMessage(editor: vscode.TextEditor) {
  focusOnNextTarget(editor, nextUntranslatedMessage);
}

export function moveToPreviousUntranslatedMessage(editor: vscode.TextEditor) {
  focusOnNextTarget(editor, nextUntranslatedMessage, true);
}

export function moveToNextFuzzyMessage(editor: vscode.TextEditor) {
  focusOnNextTarget(editor, nextFuzzyMessage);
}

export function moveToPreviousFuzzyMessage(editor: vscode.TextEditor) {
  focusOnNextTarget(editor, nextFuzzyMessage, true);
}

export function moveToNextUntranslatedOrFuzzyMessage(
  editor: vscode.TextEditor
) {
  focusOnNextTarget(editor, nextUntranslatedOrFuzzyMessage);
}

export function moveToPreviousUntranslatedOrFuzzyMessage(
  editor: vscode.TextEditor
) {
  focusOnNextTarget(editor, nextUntranslatedOrFuzzyMessage, true);
}

export function copyOriginalToUntranslated(editor: vscode.TextEditor) {
  const document = editor.document;
  const position = editor.selection.active;
  const message = new MessageParser(document, position.line).parse();
  console.log(message.msgid);
  if (isUntranslated(message)) {
    const lines = message.msgid.split('\\n');
    message.msgstr = message.msgid
    const position = new vscode.Position(message.msgstrLine, 8);
    editor.edit((editBuilder) => {
      editBuilder.insert(position,message.msgstr)
      // update other fields
    })
  }
}
