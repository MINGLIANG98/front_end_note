<template>
  <div
    ref="containerRef"
    class="innerTableContainer"
    @scroll="onScroll"
    v-loading="loading"
    element-loading-text="数据正在加载中"
    element-loading-spinner="el-icon-loading"
  >
    <table class="fixTable">
      <!-- ?? table依赖sticky固定定位了不需要整体挪移 -->
      <!--       :style="{ transform: `translateY(${scrollTop}px)` }" -->
      <!-- 固定列宽 -->
      <colgroup>
        <col
          :style="{ width: col.attrs.width + 'px' }"
          v-for="col in configCol.showColumns"
          :key="col.prop"
        />
      </colgroup>
      <thead ref="tableHeadRef">
        <tr v-for="(row, rowIndex) in configCol.headerRows" :key="rowIndex">
          <th
            v-for="(col, colIndex) in row"
            :key="col.prop"
            :colspan="col.colspan"
            :rowspan="col.rowspan"
            :style="{
              textAlign: col.attrs.headerAlign || 'center',
              ...computedFixedLeft(col, colIndex),
            }"
            :class="col.attrs.fixed || ''"
          >
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="tableData.length > 0" @click="handleRowClick">
        <tr
          v-for="(scope, rowIndex) in visibleItems"
          :key="rowIndex"
          :class="activeRow === scope['table_row_key'] && 'activeRow'"
        >
          <td
            v-for="(col, colIndex) in configCol.showColumns"
            :key="col.prop"
            :class="
              [
                col.attrs.fixed || '',
                scope[col.prop + '_hidden'] ? 'hidden' : '',
                'cell',
              ].join(' ')
            "
            :title="scope[col.prop]"
            :rowspan="scope[col.prop + '_rowSpan']"
            :style="computedFixedLeft(col, colIndex)"
          >
            <div
              v-if="
                typeof scope[col.prop] === 'string' &&
                scope[col.prop].indexOf('&color') > -1
              "
              :style="{ backgroundColor: scope[col.prop].split('&color')[1] }"
            >
              {{ scope[col.prop].split('&color')[0] }}
            </div>
            <template v-else>
              <Cell :config="col" :data="scope" />
            </template>
          </td>
        </tr>
      </tbody>
      <el-empty class="empty" v-else :image-size="200"></el-empty>
    </table>
    <div
      ref="scrollContainer"
      :style="{
        height: totalHeight + 'px',
        position: 'relative',
        visibility: 'hidden',
      }"
    />
  </div>
</template>

<script>
import Cell from '@/vabComponents/components/VabTable/cell'
import throttle from 'lodash/throttle'

export default {
  name: 'TableColumn',
  components: {
    Cell,
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    tableData: {
      type: Array,
      default() {
        return []
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      },
    },
    notShowTooltip: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    configCol() {
      function getMaxDepth(tree) {
        // 如果节点没有子节点，则返回 1 表示当前节点深度
        if (!tree.children || tree.children.length === 0) {
          return 1
        }
        // 遍历子节点，递归计算每个子节点的最大深度
        const childDepths = tree.children.map((child) => getMaxDepth(child))
        // 返回最大子节点深度 + 1
        return Math.max(...childDepths) + 1
      }
      // 最大深度
      const maxDepth = this.columns.reduce((max, col) => {
        let current = getMaxDepth(col)
        return Math.max(current, max)
      }, 1)
      // 列头合并数据结构
      const headerRow = []
      //   真实的展示列
      const realColumn = []
      // 需要合并的行
      const mergeColumn = []
      // 递归处理列并缓存计算结果
      const processColumns = (columns, depth = 0, parentProp = '') => {
        // 添加表格头 新行
        if (!headerRow[depth]) {
          headerRow.push([])
        }
        columns.forEach((col, colIndex, arr) => {
          if (col.attrs.fixed) {
            // 保存固定行的左偏移值 给固定列用
            col.offsetLeft =
              col.attrs.width + (arr?.[colIndex - 1]?.offsetLeft || 0)
          }
          headerRow[depth].push({
            ...col,
            // 合并列数  有多少子集就占多少列
            colspan: col.children?.length ?? 1,
            // 当前表格头的行数 = 最大层数-当前所在层
            rowspan: (col.children || []).length > 0 ? 1 : maxDepth - depth,
          })
          // 所有的叶子节点作为展示列
          if (!col.children || col.children.length === 0) {
            realColumn.push(col)
          }
          if (col.merge) {
            mergeColumn.push(col.prop)
          }
          if (!!col.children && col.children.length > 0) {
            processColumns(col.children, depth + 1)
          }
        })
      }
      const sortColumns = (data) => {
        return data.sort((a, b) => {
          if (a.attrs.fixed && !b.attrs.fixed) {
            return -1 // a 在前
          }
          if (!a.attrs.fixed && b.attrs.fixed) {
            return 1 // b 在前
          }
          return 0 // 不变
        })
      }
      processColumns(sortColumns([...(this.columns || [])]))
      return {
        headerRows: headerRow,
        showColumns: realColumn,
        mergeColumn,
      }
    },
  },
  methods: {
    computedFixedLeft(col) {
      if (!col.attrs.fixed) {
        return
      }
      return {
        left: `${col.offsetLeft - col.attrs.width}px`,
      }
    },
    reloadScroll(reload = true) {
      if (reload) {
        this.$refs.containerRef.scrollTop = 0

        // 可视高度
        this.containerHeight = this.$refs.containerRef.clientHeight
        // 可视区域内的行数，向上取整以确保完整显示
        this.visibleRows = Math.ceil(
          this.$refs.containerRef.clientHeight / this.itemHeight
        )
        this.onScroll({
          target: {
            scrollTop: 0,
          },
        })
      }
    },
    onScroll: throttle(function (event) {
      // y轴滚动条高度变化才触发逻辑
      if (event.target.scrollTop === this.scrollTop && this.scrollTop !== 0) {
        return
      }
      if (this.isScrolling) return
      this.isScrolling = true
      requestAnimationFrame(() => {
        let scrollTop = event.target.scrollTop
        scrollTop = Math.min(scrollTop, this.totalHeight - this.containerHeight)
        this.scrollTop = scrollTop < 0 ? 0 : scrollTop

        const startIndex = Math.floor(this.scrollTop / this.itemHeight) // 计算可见项的起始索引
        const endIndex = Math.min(
          startIndex + this.visibleRows,
          this.tableData.length
        ) // 计算结束索引
        let data = this.tableData.slice(startIndex, endIndex) // 更新可见项
        this.onTableChange(data)
        this.isScrolling = false
      })
    }, 100),
    onTableChange(data) {
      this.processMergeCol(data)
      this.visibleItems = data
    },
    // 合并列事件
    // 将合并列信息 写入数据源中
    processMergeCol(data) {
      if (this.configCol.mergeColumn.length === 0) return
      this.configCol.mergeColumn.reduce((total, key, colIndex) => {
        let beforeKey =
          colIndex > 0 ? this.configCol.mergeColumn[colIndex - 1] : null
        let mergeColspanSum = 1
        // 合并下表和合并列数映射
        let mergeIndexCoutMap = {}
        for (let index = 0; index < data.length; index++) {
          // ?? 清除数据
          data[index][key + '_hidden'] = undefined
          data[index][key + '_rowSpan'] = undefined

          //  当前key的当前行的值
          let key_curRow_val = data[index][key]
          // 当前key的下一行的值
          let key_nextRow_val = data[index + 1]?.[key]
          let beforeKey_curRow_val = data[index][beforeKey]
          let beforeKey_nextRow_val = data[index + 1]?.[beforeKey]
          // 需求: 当前行的合并列高度不能超过前一个列的合并列,就是说表格 从左到右合并列只会越来越小
          //??  如果前一列没值，就不影响后一列的合并
          /**
           * ?? 有下标且值为1则代表这一行不是合并行
           * {
              "0": 3,
              "3": 3,
              "6": 1,
              "7": 1,
              "8": 4,
            }
           */
          let beforeMergeMap = total[beforeKey] || {}
          // 如果没有前一行的合并数据则当前行不受前一行的限制
          let beforeKeyEmpty =
            [null, undefined, ''].includes(beforeKey_curRow_val) &&
            [null, undefined, ''].includes(beforeKey_nextRow_val)
          // 有下标且值为1则代表这一行不是合并行
          let beforekey_currentRow_NoMerge = beforeMergeMap[index] === 1
          // 当前行是否允许合并
          let currentRowCanMerge = true
          /***************根据前一列的合并数据 判断当前行是否允许合并 */
          // 前一列不为空
          if (beforeKeyEmpty === false) {
            // 单独一行没有形成合并行
            if (beforekey_currentRow_NoMerge === true) {
              currentRowCanMerge = false
            }
            // 是合并行 但是相邻的next行和当前行不是一个合并行（下一行有值代表不与上一行合并）
            if (!!beforeMergeMap[index + 1]) {
              currentRowCanMerge = false
            }
            // 是合并行,但是 不是同一种合并行即相邻的不合并
            if (beforeKey_curRow_val !== beforeKey_nextRow_val) {
              currentRowCanMerge = false
            }
          }
          if (
            key_curRow_val === key_nextRow_val &&
            !!key_nextRow_val &&
            // ?? 新增 如果不需要受前一行的限制 合并行只考虑当前列 去掉下面的判断即可
            // 前一列的当前行和next行也是合并列 如果不是 则当前列不能进行合并（即使值相同）
            currentRowCanMerge
          ) {
            // 合并行开始累加
            if (mergeColspanSum !== 1) {
              // 这里 当前是被合并的单元格
              data[index][key + '_hidden'] = true
            }
            // 如果当前值和下一个值相等，则合并列数加1
            mergeColspanSum++
          } else {
            let startIndex = index + 1 - mergeColspanSum
            // 保存合并列的起始位置和合并列数
            mergeIndexCoutMap[startIndex] = mergeColspanSum
            // 累加的合并结束
            if (mergeColspanSum !== 1) {
              data[index][key + '_hidden'] = true
              data[startIndex][key + '_rowSpan'] = mergeColspanSum
            }
            // 重置
            mergeColspanSum = 1
          }
        }
        total[key] = mergeIndexCoutMap
        return total
      }, {})
    },
    handleRowClick(event) {
      const row = event.target.closest('tr')
      if (row) {
        const rowIndex = Array.from(row.parentNode.children).indexOf(row)
        const scope = this.visibleItems[rowIndex]
        if (scope) {
          // 高亮行
          this.activeRow = scope['table_row_key']
        }
      }
    },
  },
  watch: {
    // 实际上监听的是数组的引用变化。
    // 使用 deep: true 选项，这样可以监听数组内元素的变化 深度比较
    tableData: {
      immediate: true,
      handler(newVal) {
        this.$nextTick(() => {
          // 总高度
          this.totalHeight =
            newVal.length * this.itemHeight +
            (this.$refs.tableHeadRef?.clientHeight || 0) //表格头高度
          // // 初始化可见项
          this.reloadScroll()
        })
      },
    },
  },

  data() {
    return {
      scrollTop: 0,
      startIndex: 0,
      itemHeight: 30, // 每行的高度
      totalHeight: 0,
      visibleItems: [], // 可视区域的行
      activeRow: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
.empty {
  position: absolute;
  width: 100%;
}
.innerTableContainer {
  width: 100%;
  /* 容器宽度 */
  height: 100%;
  /* 容器高度 */
  overflow-x: auto;
  /* 横向滚动 */
  overflow-y: auto;
  /* 纵向滚动 */
  border: 1px solid #ccc;
  /* 添加边框 */
  position: relative;
  .fixTable {
    position: sticky; /* 固定位置 */
    top: 0;
    left: 0;
    right: 0;
    z-index: 1; /* 确保表格在上层 */
  }
}

table {
  width: 100%;
  table-layout: fixed;
  /* 去除间隙 */
  border-collapse: separate;
  border-spacing: 0; /* 或设置为需要的间距 */
}

.left {
  position: sticky;
  left: 0;
  background-color: inherit;
  /* 固定列背景 */
  z-index: 1;
  /* 右边框 */
  // box-shadow: 0 0 10px #0000001f;
  // border-right: 1px solid #ebeef5;
  /* 右边框 */
}

.left:last-child::after {
  /* 确保鼠标事件不会干扰 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: -1px;
  width: 30px;
  transform: translateX(100%);
  transition: box-shadow 0.3s;
  content: '';
  pointer-events: none;
  box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
  /* 添加阴影效果 */
  -webkit-box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
  background-color: transparent;
}
// thead {
//   // position: sticky;
//   // top: 0;
//   // z-index: 1;
// }
th {
  background: #f5f5f5 !important;
  /* 表头背景 */
  box-shadow: 2px 5px rgba(0, 0, 0, 0.1); /* 使用阴影代替边框 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
tbody tr:nth-child(even) {
  background-color: #f2f2f2; /* 偶数行背景色 */
}
th,
td {
  // width: 100px;
  /* 固定列宽 */
  height: 30px;
  /* 固定行高 */
  border: 1px solid #000; /* 添加边框 */
  text-align: center;
  box-sizing: border-box;
  /* 居中对齐 */
}
// .innerTableContainer {
//   td {
//     border: 1px solid #000;
//   }
// }
tr {
  display: table-row;
  /* 行样式 */
  vertical-align: inherit;
  /* 垂直对齐 */
  unicode-bidi: isolate;
  /* Unicode 双向文本处理 */
  border-color: inherit;
  /* 边框颜色 */
  background-color: #fff;
}
.activeRow {
  background-color: rgb(229.5, 242.6, 252.6) !important;
}
tr:hover > td {
  color: $base-color-default;
  background: $base-color-white;
  .cell {
    color: $base-color-default;
  }
}

.cell {
  white-space: nowrap;
  // max-width: 150px;
  // min-width: 90px;
  // width: 100px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.cell > div {
  height: 100%;
  // line-height: 25px;
  align-content: center;
}
.hidden {
  display: none;
}
</style>
