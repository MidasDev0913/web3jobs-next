import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';

const htmlToPlainText = (htmlText: string) => {
  const blocksFromHtml = convertFromHTML(htmlText);
  const state = ContentState.createFromBlockArray(
    blocksFromHtml.contentBlocks,
    blocksFromHtml.entityMap
  );

  return EditorState.createWithContent(state)
    .getCurrentContent()
    .getPlainText();
};

type DiffStyles = {
  added: React.CSSProperties;
  removed: React.CSSProperties;
  default: React.CSSProperties;
};

export type StringDiffProps = {
  oldValue: string;
  newValue: string;
  splitView?: boolean;
};

export const StringDiff: React.FC<StringDiffProps> = ({
  oldValue,
  newValue,
  splitView,
}) => {
  const newStyles = {
    variables: {
      light: {
        diffViewerBackground: '#090913',
        diffViewerColor: '#FFFFFF',
        addedBackground: '#27382D',
        addedColor: '#FFFFFF',
        removedBackground: '#39191D',
        removedColor: '#FFFFFF',
        wordAddedBackground: '#35BA42',
        wordRemovedBackground: '#B83636',
        addedGutterBackground: '#27382D',
        removedGutterBackground: '#090913',
        gutterBackground: '#f7f7f7',
        gutterBackgroundDark: '#f3f1f1',
        highlightBackground: '#fffbdd',
        highlightGutterBackground: '#fff5b1',
        codeFoldGutterBackground: '#dbedff',
        codeFoldBackground: '#f1f8ff',
        emptyLineBackground: '#090913',
        gutterColor: '#212529',
        addedGutterColor: '#212529 ',
        removedGutterColor: '#212529',
        codeFoldContentColor: '#212529',
        diffViewerTitleBackground: '#090913',
        diffViewerTitleColor: '#fff',
        diffViewerTitleBorderColor: '#090913',
      },
    },
    titleBlock: {
      borderBottom: 'none',
    },
    content: {
      paddingLeft: '5px',
      paddingRight: '5px',
      width: 'calc(50% - 10px)',
    },
    marker: {
      paddingRight: '0px',
    },
  };

  return (
    <ReactDiffViewer
      oldValue={htmlToPlainText(oldValue)}
      newValue={htmlToPlainText(newValue)}
      splitView={Boolean(splitView)}
      showDiffOnly={false}
      hideLineNumbers
      compareMethod={DiffMethod.WORDS}
      styles={newStyles}
      leftTitle=""
      rightTitle=""
    />
  );
};
