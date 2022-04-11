import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { EditorProps } from 'react-draft-wysiwyg'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Container } from './index.styles';
import htmlToDraft from 'html-to-draftjs';

import Bold from '../../assets/icons/editorIcons/bold.svg';
import Indent from '../../assets/icons/editorIcons/indent.svg';
import Italic from '../../assets/icons/editorIcons/italic.svg';
import Link from '../../assets/icons/editorIcons/link.svg';
import Monospace from '../../assets/icons/editorIcons/monospace.svg';
import Ordered from '../../assets/icons/editorIcons/ordered.svg';
import Unordered from '../../assets/icons/editorIcons/unordered.svg';
import Outdent from '../../assets/icons/editorIcons/outdent.svg';
import StrikeThrough from '../../assets/icons/editorIcons/strikethrough.svg';
import Redo from '../../assets/icons/editorIcons/redo.svg';
import Undo from '../../assets/icons/editorIcons/undo.svg';
import dynamic from 'next/dynamic'; 


interface AppRichTextEditorProps {
  label?: string;
  placeholder?: string;
  error?: boolean;
  value?: string;
  onChange: (arg: string) => void;
}

export const AppRichTextEditor = ({
  label,
  error,
  value,
  onChange,
  placeholder,
}: AppRichTextEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (data: EditorState) => {
    setEditorState(data);
  };

  const handleBlur = () => {
    onChange(stateToHTML(editorState?.getCurrentContent()));
  };

  useEffect(() => {
    if (value) {
      const blocksFromHtml = convertFromHTML(value);
      const state = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [value]);

  return (
    <Container>
      {label && (
        <Box
          mb="11px"
          fontSize={{ xs: 13, md: 18 }}
          fontWeight={500}
          color="#fff"
        >
          {label}
        </Box>
      )}
      <Editor
        editorState={editorState}
        toolbarClassName="mui-toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="mui-editor"
        onEditorStateChange={onEditorStateChange}
        onBlur={handleBlur}
        toolbar={{
          options: ['inline', 'link', 'list', 'history'],
          inline: {
            options: ['bold', 'italic', 'strikethrough'],
            bold: { icon: Bold, className: 'custom-tool-options bold' },
            italic: { icon: Italic, className: 'custom-tool-options italic' },
            strikethrough: {
              icon: StrikeThrough,
              className: 'custom-tool-options strikethrough',
            },
            monospace: {
              icon: Monospace,
              className: 'custom-tool-options monospace',
            },
          },
          list: {
            options: ['unordered', 'ordered', 'indent', 'outdent'],
            unordered: {
              icon: Unordered,
              className: 'custom-tool-options unordered',
            },
            ordered: {
              icon: Ordered,
              className: 'custom-tool-options ordered',
            },
            indent: { icon: Indent, className: 'custom-tool-options indent' },
            outdent: {
              icon: Outdent,
              className: 'custom-tool-options outdent',
            },
          },
          link: {
            options: ['link'],
            link: { icon: Link, className: 'custom-tool-options link' },
          },
          history: {
            options: ['undo', 'redo'],
            undo: { icon: Undo, className: 'custom-tool-options undo' },
            redo: { icon: Redo, className: 'custom-tool-options redo' },
          },
        }}
      />
    </Container>
  );
};
