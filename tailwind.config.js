module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
            },

            colors: {
                pdarkblue: '#1F2537',
                pblue: '#418DBB',
                pgold: '#D6AA69',
                pgray: '#C3CED4',
                pwhite: '#F5F5F5',
            },

            width: {
                '50px': '50px',
            },

            height: {
                '40px': '40px',
                '45px': '45px',
                '57px': '57px',
                '65px': '65px',
                '80px': '80px',
                '115px': '115px',
                '165px': '165px',
                'screen-90': '90vh',
                '94' : '94%',
            },

            padding: {
                '15px': '15px',
                '30px': '30px',
                '60px': '60px',
            },

            zIndex: {
                '-10': '-10',
            },
            fill: theme => ({
                red: theme('colors.red.500'),
                green: theme('colors.green.500'),
                blue: theme('colors.blue.500'),
                black: theme('colors.black'),
                grey: theme('colors.gray.500'),
            }),
        },
        variants: {
            extend: {
                visibility: ['group-hover'],
            },
        },
        plugins: [],
    },
};
