let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Desktop/codes/webapps/careernexus/notifications/test_utils
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +34 jobnotification.html
argglobal
%argdel
edit jobnotification.html
argglobal
nnoremap <buffer>  ghs :Gitsigns stage_hunk
vnoremap <buffer>  ghs :Gitsigns stage_hunk
nnoremap <buffer>  ghr :Gitsigns reset_hunk
vnoremap <buffer>  ghr :Gitsigns reset_hunk
onoremap <buffer> ih :Gitsigns select_hunk
xnoremap <buffer> ih :Gitsigns select_hunk
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal nobinary
setlocal breakindent
setlocal breakindentopt=shift:0
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),0],:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinscopedecls=public,protected,private
setlocal cinwords=if,else,while,do,for,switch
setlocal colorcolumn=
setlocal comments=s:<!--,m:\ \ \ \ ,e:-->
setlocal commentstring=<!--\ %s\ -->
setlocal complete=.,w,b,u,t
setlocal completefunc=
setlocal completeslash=
setlocal concealcursor=
setlocal conceallevel=0
setlocal nocopyindent
setlocal nocursorbind
setlocal nocursorcolumn
setlocal cursorline
setlocal cursorlineopt=both
setlocal nodiff
setlocal eventignorewin=
setlocal expandtab
if &filetype != 'html'
setlocal filetype=html
endif
setlocal fixendofline
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=v:lua.require'lazyvim.util'.ui.foldexpr()
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldmarker={{{,}}}
setlocal foldmethod=expr
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=
setlocal formatexpr=v:lua.require'lazyvim.util'.format.formatexpr()
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal formatoptions=jcroqlnt
setlocal iminsert=0
setlocal imsearch=-1
setlocal includeexpr=
setlocal indentexpr=nvim_treesitter#indent()
setlocal indentkeys=o,O,<Return>,<>>,{,},!^F
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal linebreak
setlocal nolisp
setlocal lispoptions=
setlocal list
setlocal matchpairs=(:),{:},[:],<:>
setlocal modeline
setlocal modifiable
setlocal nrformats=bin,hex
setlocal number
setlocal numberwidth=4
setlocal omnifunc=htmlcomplete#CompleteTags
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norelativenumber
setlocal norightleft
setlocal rightleftcmd=search
setlocal scrollback=-1
setlocal noscrollbind
setlocal shiftwidth=4
setlocal signcolumn=yes
setlocal nosmartindent
setlocal smoothscroll
setlocal softtabstop=4
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\\t\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal spelloptions=noplainbuffer
setlocal statuscolumn=%!v:lua.require'snacks.statuscolumn'.get()
setlocal statusline=%#lualine_a_insert#\ INSERT\ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_b_insert#\ \ main\ %#lualine_transitional_lualine_b_insert_to_lualine_c_5_insert#%<%#lualine_c_5_insert#\ 󱉭\ \ careernexus\ %#lualine_c_normal#%#lualine_c_filetype_MiniIconsOrange_insert#\ 󰌝\ %#lualine_c_normal#%#lualine_c_normal#%#lualine_c_8_LV_Bold_insert#\ jobnotification.html%#lualine_c_normal#\ %#lualine_c_normal#%=%#lualine_x_13_insert#\ a\ %#lualine_c_normal#%#lualine_x_14_insert#\ --\ INSERT\ --\ %#lualine_c_normal#%#lualine_x_16_insert#\ \ 19\ %#lualine_c_normal#%#lualine_x_diff_modified_insert#\ \ 2\ %#lualine_transitional_lualine_b_insert_to_lualine_x_diff_modified_insert#%#lualine_b_insert#\ 48%%\ %#lualine_b_insert#\ 34:1\ \ %#lualine_transitional_lualine_a_insert_to_lualine_b_insert#%#lualine_a_insert#\ \ 09:09\ 
setlocal suffixesadd=
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != ''
setlocal syntax=
endif
setlocal tabstop=4
setlocal tagfunc=
setlocal textwidth=0
setlocal undofile
setlocal varsofttabstop=
setlocal vartabstop=
setlocal winblend=0
setlocal nowinfixbuf
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal winhighlight=Normal:Normal,VertSplit:VerticalSplit
setlocal wrap
setlocal wrapmargin=0
2
sil! normal! zo
23
sil! normal! zo
let s:l = 34 - ((20 * winheight(0) + 19) / 39)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 34
normal! 0
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
