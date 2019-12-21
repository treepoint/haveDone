import React from "react";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import CellContent from "./CellContent/CellContent";
import "./Cell.css";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      //HTML контент ячейки
      htmlContent: " ",
      //HTML контент, с которым ячейка была инициализирована
      initHtmlContent: " ",
      uuid: "",
      //Стиль по умолчанию
      style: { bold: false, italic: false, backgroundColor: "#ffffff" }
    };
  }

  componentDidMount() {
    this.updateContent();

    //Генерируем UUID для ячейки
    this.setState({ uuid: uuid() });
  }

  //Обновляем контент в ячейке
  updateContent(htmlContent) {
    //Если изменение пришло из ячейки — запишем
    if (typeof htmlContent !== "undefined") {
      this.setState({ htmlContent });
      return;
    }

    //Однако, изменение могло быть и при инициализации, тогда так
    if (typeof this.props.initHtmlContent !== "undefined") {
      //Чтобы нам не прилетело — мы здесь со строками работаем
      let initHtmlContent = String(this.props.initHtmlContent.value);

      if (initHtmlContent !== this.state.initHtmlContent) {
        this.setState({ initHtmlContent });
        this.setState({ htmlContent: initHtmlContent });
      }
    }
  }

  //Задаем возможность изменяться
  setEnabled() {
    if (this.props.isResizeble) {
      return {
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      };
    } else {
      return {
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      };
    }
  }

  //Обрабатываем изменения стиля контента в ячейке
  setStyle(style) {
    this.setState({ style });
  }

  //Обрабатываем изменения контента в ячейке
  setHtmlContent(htmlContent) {
    this.setState({ htmlContent });
  }

  //Обрабатываем изменение размеров
  changeDimensions(width, height) {
    if (!this.props.isResizeble) {
      return;
    }

    ///Отправляем uuid ячейки, которая меняет всех
    if (this.props.uuid === "") {
      this.props.changeUUID(this.state.uuid);
    }

    //Если сейчас изменяется не эта ячейка — размеры никуда не прокидываем
    if (this.props.uuid !== this.state.uuid) {
      return;
    }

    //Если что-то поменялось и это не высота, значит длина
    if (height !== 0) {
      this.props.changeHeight(height);
    } else {
      this.props.changeWidth(width);
    }
  }

  render() {
    this.updateContent();

    return (
      <Resizable
        className={!!this.props.isHeader ? "th" : "td"}
        //Выставляем размеры ячейки
        size={{
          width: this.props.width + "px",
          height: this.props.height + "px"
        }}
        //Задаем минимальную высоту
        minHeight={34}
        //Указываем какие грани ячейки активны для изменения размеров
        enable={this.setEnabled()}
        //При резайзе отправляем размеры вверх, в строку
        onResize={(e, direction, ref, d) => {
          this.changeDimensions(d.width, d.height);
        }}
        //Если закончили ресайз — прокинем событие выше. Столбец на
        //основании этого при следующем резайзе будет считать размеры заново
        onResizeStop={() => {
          this.props.stopChangeDimensions();
        }}
      >
        <CellContent
          htmlContent={this.state.htmlContent}
          scrollLeft={this.props.scrollLeft}
          isHeader={this.props.isHeader}
          width={this.props.width}
          height={this.props.height}
          isStylable={this.props.isStylable}
          isSingleLineMode={this.props.isSingleLineMode}
          disabled={!this.props.isEditable}
          style={this.state.style}
          setStyle={style => {
            this.setStyle(style);
          }}
          setHtmlContent={htmlContent => this.setHtmlContent(htmlContent)}
        />
      </Resizable>
    );
  }
}

export default Cell;
