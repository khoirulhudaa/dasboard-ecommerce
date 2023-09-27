import React from 'react';

const InputField = ({
  label,
  onBlur,
  value,
  onChange,
  placeholder,
  type,
  name,
  id,
  typeInput,
  options,
  onError,
  onTouched
}: {
  label?: string,
  onBlur?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  value?: any,
  placeholder?: string,
  type?: string,
  name?: string,
  id?: string,
  typeInput?: string,
  options?: { label: string, value: string }[],
  onError?: string | undefined,
  onTouched?: boolean | undefined
}) => {
  switch (typeInput) {
      case "select-input":
          return (
              <>
                <label htmlFor={id}>{label}</label>
                <select 
                    id={id}
                    name={name} 
                    className={`w-[100%] rounded-md bg-white outline-0 border-[1px] p-2 box-sizing ${onError && onTouched ? 'border-red-500 text-[red]' : ''}`} 
                    value={value} 
                    onChange={onChange}
                    onBlur={onBlur}>
                    {
                        options && options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))
                    }
                </select>
                {
                    onError && onTouched ? (
                        <small className='text-[red] text-[12px] font-normal my-2'>
                            {onError}
                        </small>
                    ): null
                }
            </>
        )
    case "textarea-input":
        return (
            <>
            <label htmlFor={id}>{label}</label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                style={{ height: '80px' }}
                className={`form-input ${onError && onTouched ? 'border-red-500 text-red-500' : ''}`} // Tambahkan kelas sesuai kondisi yang sesuai
                placeholder={placeholder}
            >
            </textarea>
            {
                onError && onTouched ? (
                    <small className='text-[red] text-[12px] font-normal my-2'>
                        {onError}
                    </small>
                ): null
            }
          </>
        )
    default:
      return (
          <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`form-input ${onError && onTouched ? 'border-red-500 text-red-500' : ''}`} // Tambahkan kelas sesuai kondisi yang sesuai
                placeholder={placeholder}
            />
            {
                onError && onTouched ? (
                    <small className='text-[red] text-[12px] font-normal my-2'>
                        {onError}
                    </small>
                ): null
            }
          </>
      )
  }
};

export default InputField;
