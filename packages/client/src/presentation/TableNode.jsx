import React from 'react';
import { TH, TD, TR, THead, TBody, Table } from '../styled/index.js';
import makeid from '../lib/makeid.js';

function TableNode(table) {
  const padding = '3px 6px 3px 12px';
  const backgroundColor = 'linen';

  const tHeaders = [];
  table.header.forEach((header) => {
    tHeaders.push(
      <TH
        key={makeid()}
        padding={padding}
        borderTop="1px solid"
        borderBottom="1px solid"
        backgroundColor={backgroundColor}
      >
        {header}
      </TH>
    );
  });
  const tHeadNode = (
    <THead key={makeid()}>
      <TR key={makeid()}>{tHeaders}</TR>
    </THead>
  );

  const tBodyRows = [];
  let isRequiredBackground = false;
  table.cells.forEach((rowCells) => {
    const dataCells = [];
    rowCells.forEach((cell) => {
      dataCells.push(
        <TD key={makeid()} borderBottom="1px solid" padding={padding}>
          {cell}
        </TD>
      );
    });

    const trNode = isRequiredBackground ? (
      <TR key={makeid()} backgroundColor={backgroundColor}>
        {dataCells}
      </TR>
    ) : (
      <TR key={makeid()}>{dataCells}</TR>
    );
    tBodyRows.push(trNode);
    isRequiredBackground = !isRequiredBackground;
  });
  const tBodyNode = <TBody key={makeid()}>{tBodyRows}</TBody>;

  const node = (
    <Table key={makeid()} borderCollapse="collapse" borderSpace="0px" borderLeft="1px solid" borderRight="1px solid">
      {tHeadNode}
      {tBodyNode}
    </Table>
  );

  return node;
}

export default TableNode;
