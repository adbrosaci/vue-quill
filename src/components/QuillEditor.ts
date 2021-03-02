import Quill, {
  TextChangeHandler,
  SelectionChangeHandler,
  EditorChangeHandler,
  RangeStatic,
  QuillOptionsStatic,
} from "quill";
import { Delta } from "types-quill-delta";
import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import { toolbarOptions } from "./options";

// export
export default defineComponent({
  name: "QuillEditor",
  props: {
    content: {
      type: Object as PropType<Delta>,
      default: {},
    },
    enable: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object as PropType<QuillOptionsStatic>,
      required: false,
    },
    theme: {
      type: String as PropType<"snow" | "bubble">,
      default: "snow",
    },
    toolbar: {
      type: [String, Array],
      required: false,
      default: [],
      validator: (value: string | object) => {
        if (typeof value === "string") {
          return Object.keys(toolbarOptions).indexOf(value) !== -1;
        }
        return true;
      },
    },
    globalOptions: {
      type: Object as PropType<QuillOptionsStatic>,
      required: false,
      default: {},
    },
  },
  emits: [
    // Quill events
    "text-change",
    "selection-change",
    "editor-change",
    // Additional events
    "update:content",
    "focus",
    "blur",
    "ready",
  ],
  setup: (props, ctx) => {
    let quill: Quill | null = null;
    const options = ref<QuillOptionsStatic>({});
    const wrapper = ref<HTMLDivElement>();
    const editor = ref<HTMLDivElement>();

    // Init Quill
    const initialize = () => {
      if (editor.value && wrapper.value) {
        // Options
        const clientOptions: QuillOptionsStatic = {
          theme: props.theme,
          modules: {
            toolbar: typeof props.toolbar === "string"
              ? toolbarOptions[props.toolbar]
              : props.toolbar
          }
        };
        options.value = Object.assign(
          {},
          props.globalOptions,
          props.options,
          clientOptions,
        );
        // Create Instance
        quill = new Quill(editor.value as Element, options.value);
        // Set editor content
        if (props.content) quill.setContents(props.content);
        // Set event handlers
        quill.on("text-change", handleTextChange);
        quill.on("selection-change", handleSelectionChange);
        quill.on("editor-change", handleEditorChange);
        // Style the editor
        if (props.theme !== "bubble") {
          wrapper.value.style.display = "flex";
          wrapper.value.style.flexDirection = "column";
          editor.value.style.flexGrow = "1";
          editor.value.style.overflowY = "auto";
        }
        // Emit ready event
        ctx.emit("ready", quill);
      }
    };

    const handleTextChange: TextChangeHandler = (...args) => {
      // Update model if text changes
      ctx.emit("update:content", quill?.getContents());
      ctx.emit("text-change", ...args);
    };

    const handleSelectionChange: SelectionChangeHandler = (
      range: RangeStatic,
      ...args
    ) => {
      // Mark model as touched if editor lost focus
      if (!range) ctx.emit("blur", quill);
      else ctx.emit("focus", quill);
      ctx.emit("selection-change", range, ...args);
    };

    const handleEditorChange: EditorChangeHandler = (name: String, ...args) => {
      ctx.emit("editor-change", name, ...args);
    };

    onMounted(() => {
      initialize();
    });

    onBeforeUnmount(() => {
      quill = null;
    });

    watch(
      () => props.content,
      (newContent, oldContent) => {
        if (quill) {
          if (newContent && newContent !== props.content) {
            quill.setContents(newContent);
          } else if (!newContent) {
            quill.setText("");
          }
        }
      }
    );

    watch(
      [props.options, props.theme],
      () => {
        wrapper.value?.removeAttribute("style");
        editor.value?.removeAttribute("style");
        quill?.getModule("toolbar").container.remove();
        initialize();
      }
    );

    watch(
      () => props.toolbar,
      () => {
        quill?.getModule("toolbar").container.remove();
        initialize();
      }
    );

    watch(
      () => props.enable,
      (newValue, oldValue) => {
        if (quill) quill.enable(newValue);
      }
    );

    return {
      quill,
      options,
      wrapper,
      editor,
      handleTextChange,
      handleSelectionChange,
      handleEditorChange,
    };
  },
  render() {
    return h(
      "div",
      { ref: "wrapper", ...this.$attrs },
      [
        this.$slots.toolbar?.(),
        h("div", { ref: "editor" })
      ],
    )
  },
});