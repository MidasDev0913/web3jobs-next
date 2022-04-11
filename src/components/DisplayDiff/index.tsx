import React from 'react';
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';


const htmlToPlainText = (htmlText: string) => {
  const blocksFromHtml = convertFromHTML(htmlText);
  const state = ContentState.createFromBlockArray(
    blocksFromHtml.contentBlocks,
    blocksFromHtml.entityMap
  );

  return EditorState.createWithContent(state).getCurrentContent().getPlainText()
}

type DiffStyles = {
  added: React.CSSProperties;
  removed: React.CSSProperties;
  default: React.CSSProperties;
};

export type StringDiffProps = {
  oldValue: string;
  newValue: string;
  method?: DiffMethod;
  styles?: DiffStyles;
  className?: string;
  component?: React.ElementType;
  dangerouslySetInnerHTML?: boolean;
};

export const StringDiff: React.FC<StringDiffProps> = ({
  oldValue,
  newValue,
}) => {

  const newStyles = {
    variables: {
      light: {
        diffViewerBackground: '#fff',
        diffViewerColor: '#212529',
        addedBackground: '#e6ffed',
        addedColor: '#24292e',
        removedBackground: '#ffeef0',
        removedColor: '#24292e',
        wordAddedBackground: '#acf2bd',
        wordRemovedBackground: '#fdb8c0',
        addedGutterBackground: '#cdffd8',
        removedGutterBackground: '#ffdce0',
        gutterBackground: '#f7f7f7',
        gutterBackgroundDark: '#f3f1f1',
        highlightBackground: '#fffbdd',
        highlightGutterBackground: '#fff5b1',
        codeFoldGutterBackground: '#dbedff',
        codeFoldBackground: '#f1f8ff',
        emptyLineBackground: '#fafbfc',
        gutterColor: '#212529',
        addedGutterColor: '#212529 ',
        removedGutterColor: '#212529',
        codeFoldContentColor: '#212529',
        diffViewerTitleBackground: '#fafbfc',
        diffViewerTitleColor: '#212529',
        diffViewerTitleBorderColor: '#eee',
      }
    }
  };

  return <ReactDiffViewer
    oldValue={htmlToPlainText(oldValue)}
    newValue={htmlToPlainText(newValue)}
    splitView={false}
    compareMethod={DiffMethod.WORDS}
    styles={newStyles}
    leftTitle="Old:"
    rightTitle="New"
  />
};
