export default defineAppConfig({
  ui: {
    colors: {
      primary: 'clay',
      neutral: 'stone'
    },
    prose: {
      h2: {
        slots: {
          base: 'font-serif text-[1.75rem] leading-[1.2] text-inherit mt-5 mb-0'
        }
      },
      p: {
        base: 'mt-5 mb-0 first:mt-0'
      },
      ul: {
        base: 'mt-5 mb-0'
      },
      li: {
        base: 'mt-3 mb-0 first:mt-0'
      }
    }
  }
})
