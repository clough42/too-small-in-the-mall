namespace TooSmall
{
    using System;
    using System.ComponentModel;
    using System.Drawing;
    using System.Windows.Forms;

    public class TooSmallForm : Form, TooSmallUI
    {
        private Button againButton;
        private TextBox commandBox;
        private Container components;
        private Button enterButton;
        private Label exitsBox;
        private const string filter = "TooSmall game files (*.tsm)|*.tsm";
        private TooSmall.TooSmall game;
        private Label label1;
        private TextBox outputBox;
        private Label roomBox;

        public TooSmallForm()
        {
            this.InitializeComponent();
            this.newGame();
        }

        public void addText(string text)
        {
            this.outputBox.AppendText(text);
        }

        private void againButton_Click(object sender, EventArgs e)
        {
            this.newGame();
        }

        public void displayRoomInfo(Room room)
        {
            this.roomBox.Text = room.Name;
            this.exitsBox.Text = "Obvious Exits:" + ((room.N > 0) ? " North" : "") + ((room.S > 0) ? " South" : "") + ((room.E > 0) ? " East" : "") + ((room.W > 0) ? " West" : "");
        }

        public void displayVanityPlate()
        {
            MessageBox.Show("Insert Vanity Plate Here");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && (this.components != null))
            {
                this.components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void enterButton_Click(object sender, EventArgs e)
        {
            if (!this.game.userInput(this.commandBox.Text))
            {
                this.gameOver();
            }
            else
            {
                this.commandBox.Text = "";
                this.commandBox.Focus();
            }
        }

        private void gameOver()
        {
            this.againButton.Visible = true;
            this.commandBox.Visible = false;
            this.enterButton.Visible = false;
            base.AcceptButton = this.againButton;
        }

        public string getLoadFileName()
        {
            OpenFileDialog dialog = new OpenFileDialog {
                Filter = "TooSmall game files (*.tsm)|*.tsm"
            };
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                return dialog.FileName;
            }
            return null;
        }

        public string getSaveFileName()
        {
            SaveFileDialog dialog = new SaveFileDialog {
                Filter = "TooSmall game files (*.tsm)|*.tsm"
            };
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                return dialog.FileName;
            }
            return null;
        }

        private void InitializeComponent()
        {
            this.commandBox = new TextBox();
            this.label1 = new Label();
            this.outputBox = new TextBox();
            this.roomBox = new Label();
            this.exitsBox = new Label();
            this.againButton = new Button();
            this.enterButton = new Button();
            base.SuspendLayout();
            this.commandBox.Anchor = AnchorStyles.Right | AnchorStyles.Left | AnchorStyles.Bottom;
            this.commandBox.Location = new Point(80, 0x1a0);
            this.commandBox.Name = "commandBox";
            this.commandBox.Size = new Size(0x1d0, 20);
            this.commandBox.TabIndex = 0;
            this.commandBox.Text = "";
            this.label1.Anchor = AnchorStyles.Left | AnchorStyles.Bottom;
            this.label1.Font = new Font("Microsoft Sans Serif", 8.25f, FontStyle.Bold, GraphicsUnit.Point, 0);
            this.label1.Location = new Point(8, 0x1a0);
            this.label1.Name = "label1";
            this.label1.Size = new Size(0x40, 0x17);
            this.label1.TabIndex = 1;
            this.label1.Text = "Command:  ";
            this.label1.TextAlign = ContentAlignment.MiddleLeft;
            this.outputBox.Anchor = AnchorStyles.Right | AnchorStyles.Left | AnchorStyles.Bottom | AnchorStyles.Top;
            this.outputBox.Location = new Point(8, 40);
            this.outputBox.MaxLength = 0xf4240;
            this.outputBox.Multiline = true;
            this.outputBox.Name = "outputBox";
            this.outputBox.ReadOnly = true;
            this.outputBox.Size = new Size(0x268, 0x170);
            this.outputBox.TabIndex = 2;
            this.outputBox.Text = "";
            this.roomBox.Font = new Font("Microsoft Sans Serif", 8.25f, FontStyle.Bold, GraphicsUnit.Point, 0);
            this.roomBox.Location = new Point(8, 8);
            this.roomBox.Name = "roomBox";
            this.roomBox.Size = new Size(0xd8, 0x17);
            this.roomBox.TabIndex = 3;
            this.roomBox.Text = "room";
            this.roomBox.TextAlign = ContentAlignment.MiddleLeft;
            this.exitsBox.Anchor = AnchorStyles.Right | AnchorStyles.Top;
            this.exitsBox.BackColor = SystemColors.Control;
            this.exitsBox.Font = new Font("Microsoft Sans Serif", 8.25f, FontStyle.Bold, GraphicsUnit.Point, 0);
            this.exitsBox.Location = new Point(360, 8);
            this.exitsBox.Name = "exitsBox";
            this.exitsBox.Size = new Size(0x108, 0x17);
            this.exitsBox.TabIndex = 4;
            this.exitsBox.Text = "exits";
            this.exitsBox.TextAlign = ContentAlignment.MiddleRight;
            this.againButton.Anchor = AnchorStyles.Left | AnchorStyles.Bottom;
            this.againButton.Location = new Point(80, 0x1a0);
            this.againButton.Name = "againButton";
            this.againButton.TabIndex = 5;
            this.againButton.Text = "Play Again";
            this.againButton.Visible = false;
            this.againButton.Click += new EventHandler(this.againButton_Click);
            this.enterButton.Anchor = AnchorStyles.Right | AnchorStyles.Bottom;
            this.enterButton.Location = new Point(0x228, 0x1a0);
            this.enterButton.Name = "enterButton";
            this.enterButton.TabIndex = 6;
            this.enterButton.Text = "Enter";
            this.enterButton.Click += new EventHandler(this.enterButton_Click);
            base.AcceptButton = this.enterButton;
            this.AutoScaleBaseSize = new Size(5, 13);
            base.ClientSize = new Size(0x278, 0x1be);
            base.Controls.Add(this.enterButton);
            base.Controls.Add(this.againButton);
            base.Controls.Add(this.exitsBox);
            base.Controls.Add(this.roomBox);
            base.Controls.Add(this.outputBox);
            base.Controls.Add(this.label1);
            base.Controls.Add(this.commandBox);
            base.Name = "TooSmallForm";
            this.Text = "Too Small in the Mall";
            base.ResumeLayout(false);
        }

        private void newGame()
        {
            this.againButton.Visible = false;
            this.commandBox.Visible = true;
            this.enterButton.Visible = true;
            this.outputBox.Text = "";
            this.commandBox.Text = "";
            this.commandBox.Focus();
            this.game = new TooSmall.TooSmall(this);
            base.AcceptButton = this.enterButton;
        }
    }
}
