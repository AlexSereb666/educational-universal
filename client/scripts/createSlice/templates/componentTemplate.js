const interfaceConst = 'interface';

module.exports = (componentName) => `import classNames from 'classnames';
import cls from './${componentName}.module.scss';
import { memo } from 'react';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
    const { className } = props;
    
    return (
        <div className={classNames(cls.${componentName}, {}, [className])}>
           
        </div>
    );
});`;
